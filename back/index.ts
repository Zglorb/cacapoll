import express from 'express'
import httpProxy from 'http-proxy'
import http from 'http'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library'
import creds from './client_secret.json';
import axios from 'axios';
import qs from 'qs';
const app = express()
const server = http.createServer(app)
const vote: string[] = []
const SCOPES = [
	'https://www.googleapis.com/auth/spreadsheets'
] 
const jwt = new JWT({
	email: creds.client_email,
	key: creds.private_key,
	scopes: SCOPES,
});
const doc = new GoogleSpreadsheet('1ALPjyJjsHVVGYV1mg0DW23P_iE4deTlhBs0f6vkKfdA', jwt);

await doc.loadInfo(); // loads document properties and worksheets
console.log(doc.title);

app.use(express.json())


const proxy = httpProxy.createProxyServer(
	{
		target: 'http://front:5173',
		changeOrigin: true,
		ws: true,
	}
)

app.post('/api/vote', async (req, res) => {
	// console.log("ip:", req.socket.remoteAddress)
	let data = req.body as {chosenMovies: { title: string, ip: string }[] , token: string } 
	console.log(data)
	let vote = data.chosenMovies
	if (vote.length !== 5) {
		res.status(400).send('wrong number of movies')
		return
	}
	let response = await axios.post('https://www.google.com/recaptcha/api/siteverify', qs.stringify({
		secret: '6LeYSU8pAAAAAGuAfQfnxCS0RcwQiKJucf3ZnKFK',
		response: data.token
	}), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
	if (!response.data.success) {
		res.status(400).send('bot detected')
		return
	}
	for (let i = 0; i < vote.length; i++) {
		const sheet = doc.sheetsByIndex[i];
		sheet.addRow(vote[i]);
	}
	res.send('ok')
})

setInterval(() => {
	for(let i = 0; i < 5; i++) {
		const sheet = doc.sheetsByIndex[i];
		sheet.saveUpdatedCells();
	}
}, 5000)
server.listen(3000).on('listening', () => {
	console.log('Server is listening on port 3000')
})