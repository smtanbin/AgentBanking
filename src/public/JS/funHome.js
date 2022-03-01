/*api server url is in environment file*/
const apiserver = '/api/'

/* Requesting part start here. */
const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Access-Control-Allow-Origin', '*')

const redAlart = (input) => {
	if (input > 10000) {
		return text - error
	}
}

/* This is a color chart for pie chat*/
const barColors = [ '#F50F0F', '#2285F5', '#9064F5', '#24F490', '#F5BC58', '#F59FD7', '#AA9FF5', '#2596be', '#A9016E' ]

/* Account Status give a graf with table data*/
const accountStatus = async () => {
	/* Post request body content*/
	const url = `${apiserver}accountStatus`
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	}

	// Init array for creating array
	let calMphone = 0
	let calOpenToday = 0
	let calOpenYesterday = 0
	let calCloseToday = 0
	let calCloseYesterday = 0
	let totalOpenToday = 0
	let totalOpenYesterday = 0
	let totalCloseToday = 0
	let totalCloseYesterday = 0
	let totalAllAccount = 0

	await fetch(url, requestOptions).then((response) => response.json()).then((payload) => {
		payload.map(({ OPENYESTERDAY, OPENTODAY, ALLACCOUNT, PMPHONE, CLOSETODAY, CLOSEYESTERDAY }) => {
			calMphone += `${PMPHONE},`
			calOpenToday += `${OPENTODAY},`
			calCloseYesterday = `${CLOSEYESTERDAY},`
			calOpenYesterday += `${OPENYESTERDAY},`
			calCloseToday += `${CLOSETODAY},`
			totalOpenToday += OPENTODAY
			totalOpenYesterday += OPENYESTERDAY
			totalCloseToday += CLOSETODAY
			totalCloseYesterday += CLOSEYESTERDAY
			totalAllAccount += ALLACCOUNT

			document.getElementById('accountStatusTable').innerHTML += `<tr>
		<td class="text-tiny">${PMPHONE}</td>
		<td class="text-tiny">${OPENTODAY}</td>
		<td class="text-tiny">${CLOSETODAY}</td>
		<td class="text-tiny">${OPENYESTERDAY}</td>
		<td class="text-tiny">${CLOSEYESTERDAY}</td>
		<td class="text-tiny">${ALLACCOUNT}</td>
	  </tr>`
		})
		document.getElementById('accountStatusTable').innerHTML += `<tr>
		<td class="text-tiny text-bold text-primary">Total</td>
		<td class="text-tiny text-bold text-primary">${totalOpenToday}</td>
		<td class="text-tiny text-bold text-primary">${totalCloseToday}</td>
		<td class="text-tiny text-bold text-primary">${totalOpenYesterday}</td>
		<td class="text-tiny text-bold text-primary">${totalCloseYesterday}</td>
		<td class="text-tiny text-bold text-primary">${totalAllAccount}</td>
	  </tr>`

		let arrMphone = calMphone.split(',')
		let arrOpenToday = calOpenToday.split(',')
		let arrOpenYesterday = calOpenYesterday.split(',')
		let arrCloseToday = calCloseToday.split(',')
		let arrCloseYesterday = calCloseYesterday.split(',')

		new Chart('accountStatus', {
			type: 'line',
			data: {
				labels: arrMphone,
				datasets: [
					{
						label: 'New Account Today',
						data: arrOpenToday,
						borderColor: '#00C746',
						backgroundColor: '#00C74640',
						// backgroundColor: '#00C746',
						fill: true,
						tension: 0.1
					},
					{
						data: arrOpenYesterday,
						label: 'New Account Yesterday',
						borderColor: '#2596be',
						backgroundColor: '#2596be40',
						// backgroundColor: '#2596be',
						fill: true,
						tension: 0.1
					},
					{
						data: arrCloseToday,
						label: 'Close Account Today',
						borderColor: '#C72302',
						backgroundColor: '#C7230240',
						// backgroundColor: '#C72302',
						fill: true,
						tension: 0.1
					},
					{
						data: arrCloseYesterday,
						label: 'Close Account Yesterday',
						borderColor: '#f3711e',
						backgroundColor: '#f3711e40',
						// backgroundColor: '#f3711e',
						fill: true,
						tension: 0.1
					}
				]
			},
			options: {
				layout: {
					padding: 5
				},
				legend: { display: true, text: 'Today' },
				title: {
					display: false,
					position: 'top',
					text: 'Agent Account Status'
				},
				scales: {
					yAxes: [
						{
							ticks: {
								suggestedMin: 0,
								suggestedMax: 5
							}
						}
					]
				}
			}
		})
	})
}

/* Pie Chart*/

const pichat = async () => {
	/* Post request body content*/
	const url = `${apiserver}pichart`
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	}
	let xValues = []

	let yValues = []

	await fetch(url, requestOptions).then((response) => response.json()).then((payload) => {
		payload.map(({ TYPE, BALANCE }) => {
			xValues += `${TYPE},`
			yValues += `${BALANCE},`
		})

		const xaxe = xValues.split(',')
		const yaxe = yValues.split(',')

		new Chart('Chart', {
			type: 'pie',
			data: {
				labels: xaxe,
				datasets: [
					{
						backgroundColor: barColors,
						data: yaxe,
						radius: '50%'
					}
				]
			},
			options: {
				title: {
					display: false,
					text: 'Balance',
					position: 'top'
				}
			}
		})
	})
}

const agentstatus = async () => {
	const url = `${apiserver}agentstatus`
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	}

	let local_mphone = []
	let loacl_today = []
	let local_yesterday = []
	let loaclTatalToday = 0
	let loaclTatalYesterday = 0
	let style = 'text-dark'

	await fetch(url, requestOptions).then((response) => response.json()).then((payload) => {
		/*Contracting a string with , to separate value*/
		payload.map(({ MPHONE, ACCOUNT_NAME, YESTERDAY, TODAY }) => {
			local_mphone += `${MPHONE},`
			loacl_today += `${TODAY.toFixed(2)},`
			local_yesterday += `${YESTERDAY.toFixed(2)},`
			loaclTatalToday += TODAY
			loaclTatalYesterday += YESTERDAY
			if (YESTERDAY > TODAY) {
				style = 'text-error'
			} else if (TODAY > YESTERDAY) {
				style = 'text-success'
			} else {
				style = 'text-dark'
			}
			document.getElementById('agentInfo').innerHTML += `			<tr>
			<td class="text-tiny">${MPHONE}</td>
			<td class="text-tiny text-left text-ellipsis">${ACCOUNT_NAME}</td>
			<td class="text-tiny ${style} text-right ">${TODAY.toLocaleString('en-BD', {
				maximumFractionDigits: 2
			})}</td>
			<td class="text-tiny text-right ">${YESTERDAY.toLocaleString('en-BD', {
				maximumFractionDigits: 2
			})}</td>
		  </tr>`
		})
		document.getElementById('agentInfo').innerHTML += `			<tr>
		<td class="text-tiny text-primary text-bold" colspan="2">Total </td>
		
		<td class="text-tiny text-right text-primary text-bold">${loaclTatalToday.toLocaleString('en-BD', {
			maximumFractionDigits: 2
		})}</td>
		<td class="text-tiny text-right text-primary text-bold">${loaclTatalYesterday.toLocaleString('en-BD', {
			maximumFractionDigits: 2
		})}</td>
	  </tr>`
		// turning INTO ARRAY
		const intlocal_mphone = local_mphone.split(',')
		const intloacl_today = loacl_today.split(',')
		const intlocal_yesterday = local_yesterday.split(',')

		new Chart('agentChart', {
			type: 'bar',
			data: {
				labels: intlocal_mphone,
				datasets: [
					{
						data: intloacl_today,
						label: 'Today',
						backgroundColor: '#0e3150',
						fill: false
					},
					{
						data: intlocal_yesterday,
						label: 'Yesterday',
						backgroundColor: '#288bfc',
						fill: false
					}
				]
			},
			options: {
				legend: { display: true, text: 'Today' },
				title: {
					display: false,
					position: 'top',
					text: 'Agent Balance'
				}
			}
		})
	})
}

const customerstatus = async () => {
	let local_mphone = []
	let loacl_cc = []
	let loacl_cy = []
	/* Post request body content*/

	const url = `${apiserver}customerstatus`
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	}
	await fetch(url, requestOptions).then((response) => response.json()).then((payload) => {
		/*Contracting a string with , to separate value*/
		let localCustomerToday = 0
		let localCustomerYday = 0
		let style = 'text-dark'
		payload.map(({ MPHONE, ACCOUNT_NAME, CUSTOMER_CURRENT, CUSTOMER_YESTERDAY }) => {
			local_mphone += `${MPHONE},`
			loacl_cc += `${CUSTOMER_CURRENT.toFixed(2)},`
			loacl_cy += `${CUSTOMER_YESTERDAY.toFixed(2)},`
			localCustomerToday += CUSTOMER_CURRENT
			localCustomerYday += CUSTOMER_YESTERDAY

			if (CUSTOMER_YESTERDAY > CUSTOMER_CURRENT) {
				style = 'text-error'
			} else if (CUSTOMER_CURRENT > CUSTOMER_YESTERDAY) {
				style = 'text-success'
			} else {
				style = 'text-dark'
			}

			document.getElementById('customerInfo').innerHTML += `<tr>
			<td class="text-tiny">${MPHONE}</td>
			<td class="text-tiny text-ellipsis">${ACCOUNT_NAME}</td>
			<td class="text-tiny ${style} text-right">${CUSTOMER_CURRENT.toLocaleString('en-BD', {
				maximumFractionDigits: 2
			})}</td>
			<td class="text-tiny text-right">${CUSTOMER_YESTERDAY.toLocaleString('en-BD', {
				maximumFractionDigits: 2
			})}</td>
		  </tr>`
		})
		document.getElementById('customerInfo').innerHTML += `<tr>
		<td class="text-tiny text-primary text-bold" colspan="2">Total </td>

		<td class="text-tiny text-right text-primary text-bold">${localCustomerToday.toLocaleString('en-BD', {
			maximumFractionDigits: 2
		})}</td>
		<td class="text-tiny text-right text-primary text-bold">${localCustomerYday.toLocaleString('en-BD', {
			maximumFractionDigits: 2
		})}</td>
	  </tr>`
		// turning INTO ARRAY
		local_mphone = local_mphone.split(',')
		loacl_cc = loacl_cc.split(',')
		loacl_cy = loacl_cy.split(',')

		new Chart('customerChart', {
			type: 'bar',
			data: {
				labels: local_mphone,
				datasets: [
					{
						data: loacl_cc,
						label: 'Today',
						backgroundColor: '#0e3150'
					},
					{
						data: loacl_cy,
						label: 'Yesterday',
						backgroundColor: '#288bfc'
					}
				]
			},
			options: {
				legend: {
					display: true
				},
				title: {
					display: false,
					position: 'top',
					text: 'Customer Balance'
				}
			}
		})
	})
	document.getElementById('loading').remove()
}

const timer = () => {
	let now = new Date()
	let hour = now.getHours()
	hour = hour * 60
	let minute = now.getMinutes()
	let remaintime = hour + minute - 540

	if (remaintime > 960 - 540) {
		document.getElementById('remainer').setAttribute('value', remaintime)
		document.getElementById('remainer-text').classList.remove('text-primary')
		document.getElementById('remainer-body').classList.add('bg-warning')
	}
	if (remaintime > 1020 - 540) {
		document.getElementById('remainer').setAttribute('value', remaintime)
		document.getElementById('remainer-text').classList.remove('text-primary')
		document.getElementById('remainer-body').classList.add('bg-error')
	} else {
		document.getElementById('remainer').setAttribute('value', remaintime)
	}
}

timer()
pichat()
agentstatus()
customerstatus()
accountStatus()
