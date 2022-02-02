const getuvanls = async () => {
	const apiserver = 'http://127.0.0.1/api'
	const url = `${apiserver}/uvanls`
	const myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')

	const raw = JSON.stringify({
		ID: 'autho'
	})
	console.log(raw)
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	}

	await fetch(url, requestOptions).then((response) => response.json()).then((payload) => {
		payload.map((data) => {
			const { TRANS_SNAME } = data
			document.getElementById('uvanls').innerHTML += `<option value="${TRANS_SNAME}">${TRANS_SNAME}</option>`
		})
	})
}
getuvanls()
const utilityinfo = async () => {
	const apiserver = 'http://127.0.0.1/api'
	const url = `${apiserver}/utilityinfodtl`
	const uvanls = document.getElementById('uvanls')
	let key = uvanls.value
	let fromdate = document.getElementById('fromdate').value
	let todate = document.getElementById('todate').value
	let printday = Date()
	// request
	const myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')

	const raw = JSON.stringify({
		key: `${key}`
	})

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}
	let sl = 0
	let TRANS_AMT_TOTAL = 0
	let VAT_AMT_TOTAL = 0
	let STAMP_AMT_TOTAL = 0
	document.getElementById('output').innerHTML += `


	
	<div class="card col-12 p-2">
		<div class="p-2">
			<div class="container">
				<div class="columns col-sm-12">
					<div class="columns col-12">
						<h2 class="p-centered">Standard Bank Limited</h2>
					</div>
					<div class="card p-2 w100 col-12 bg-gray">
					<div class="columns col-12">
						<h6 class="p-centered">Agent Banking Division</h6>
					</div>
					<div class="columns col-sm-12">
						<p>Summery of Electricity Bill Colllection Report : ${key}</p>
					</div>

					<div class="columns col-12">
						<div class="columns col-6 float-left">
							Date: From ${fromdate} To ${todate}
						</div>
						<div class="columns col-6 float-righ">
							Print Date: ${printday}
						</div>
					</div>
					</div>

					<div class="columns col-12">
						<table class="table">
							<thead>
								<tr><th>SL.</th>
									<th>Date</th>
									<th>Trans NO</th>
									<th>Net Bill</th>
									<th>Vat</th>
									<th>Rev.Stamp</th>
									<th>ACNO</th>
									<th>Book No</th>
									<th>Month</th>
								</tr>
							</thead><tbody id="output2"></tbody>
							</table>
							<div class="card bg-gray p-2 m-2 col-4" id="billsummary">
							
							</div>
						</div>
					</div>
					<div class="col-12 w100 p-centered bg-gray p-2 mt-2">
					<p>Standard Bank Agent Banking Division Head Office<br/>
					Metropolitan Chamber Building (3rd Floor)
					122-124 Motijheel C/A, Dhaka-1000, Bangladesh<br/>
					Telephone +8802223358385 ,+8802223385106 ,+8802223357913</p>
					</div>
				</div>
			</div>
		</div>`

	await fetch(url, requestOptions).then((response) => response.json()).then((payload) => {
		payload.map((data) => {
			const { ENTRY_DATE, TRANS_NO, TRANS_AMT, VAT_AMT, STAMP_AMT, ACNO, BOOKNO, MONTH } = data
			sl += 1
			document.getElementById('output2').innerHTML += `
							
								<tr>
								<td>${sl}<td/>
									<td>${ENTRY_DATE}</td>
									<td>${TRANS_NO}</td>
									<td>${TRANS_AMT}</td>
									<td>${VAT_AMT}</td>
									<td>${STAMP_AMT}</td>
									<td>${ACNO}</td>
									<td>${BOOKNO}</td>
									<td>${MONTH}</td>
								</tr>
							`

			TRANS_AMT_TOTAL += TRANS_AMT
			VAT_AMT_TOTAL += VAT_AMT
			if (STAMP_AMT !== null && STAMP_AMT != 0) {
				STAMP_AMT_TOTAL += 1
			}
		})
		// Bill Summary
		// const t = TRANS_AMT_TOTAL - VAT_AMT_TOTAL
		document.getElementById('billsummary').innerHTML = `
		<h4>Bill Summary</h4>
		<p class="row">
		Total Bill Collected: ${sl} <br/>	
		Total Net Bill Amount: ${TRANS_AMT_TOTAL} .BDT<br/>
		Total Vat Amount:${VAT_AMT_TOTAL} .BDT<br/>
		Total Stamp Used: ${STAMP_AMT_TOTAL}<br/>
		Total Payable: ${TRANS_AMT_TOTAL - VAT_AMT_TOTAL} .BDT<br/>
		</p>`
	})
	// document.getElementById(
	// 	'output2'
	// ).lastElementChild.innerHTML = `<tr class="active"><td>${sl}</td><td>Total</td><td>${TRANS_AMT_TOTAL}</td><td>${VAT_AMT_TOTAL}</td><td>${STAMP_AMT_TOTAL}</td><td></td><td></td><td></td></tr>`
}
