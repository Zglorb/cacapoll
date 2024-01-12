import express from 'express'
import httpProxy from 'http-proxy'
import http from 'http'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library'
import creds from './client_secret.json';
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
	console.log("ip:", req.socket.remoteAddress)
	let vote = req.body as { title: string, ip: string }[]
	// console.log(vote)
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