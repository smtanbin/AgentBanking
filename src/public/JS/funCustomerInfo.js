/*api server url is in environment file*/
const apiserver = '/api/'
/* Requesting part start here. */
const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Access-Control-Allow-Origin', '*')

const custsearch = async () => {
	document.getElementById('btn-loading').classList.add('loading')
	const url = `${apiserver}/customerinfo`
	let id = document.getElementById('acno').value
	console.log(id)

	const raw = JSON.stringify({
		id: `${id}`
	})
	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	}

	await fetch(url, requestOptions).then((response) => response.json()).then((payload) => {
		console.log(payload)
		payload.map((data) => {
			const {
				ACCOUNT_NAME,
				AC_TYPE,
				AC_TYPE_CODE,
				AGENT,
				AGENTAC,
				AUTHO_BY,
				BALANCE,
				BIOMATRIC,
				CATEGORY,
				COMPANY_AC_TYPE,
				DR_LINK_ACC,
				ENTRY_DATE,
				EXCISE_DUE,
				FORM_SERIAL,
				IMGAE,
				LAST_TRANS_DATE,
				LIEN_M,
				MATURITY_DATE,
				MCHARGE_FLAG,
				MOD_AC_OPRN,
				MPHONE,
				REG_DATE,
				REG_STATUS,
				SLAB_SL_NO,
				SOURCE_OFFUND,
				STATUS,
				TIN_NO,
				UPDATE_BY,
				UPDATE_DATE,
				BLOOD_GROUP,
				CON_MOB,
				CUSTOMER_NAME,
				CUST_ID,
				DOB,
				FATHER_NAME,
				MOTHER_NAME,
				GENDER,
				OCCUPATION,
				PMPHONE,
				REG_DATE,
				RELIGION,
				SPOUSE_NAME,
				TIN_NO
			} = data

			document.getElementById('output').innerHTML = `<div class="container p-2">
			<h5 class="text-center w100 text-bold p-2">Customer Information
			</h5>
			<div class="columns">
			  <div class="column col-8 w100 card bg-gray p-2 ">
				<h4 class="h4 text-primary text-clip">${ACCOUNT_NAME}</h4>
  
				<p class="text-tiny">Customer Type: ${NAME}</p>
				<br />
				<h5 class="h5 text-primary text-clip">Customer Information</h5>
				<p class="text-tiny">
				  Customer ID: ${CAST_ID} <br />
				  Name: ${CUSTOMER_NAME} <br />
				  Father Name: ${NAME} <br />
				  Mother Name: ${NAME} <br />
				  Spouse Name: ${NAME} <br />
				  Date of Birth: ${NAME} <br />
				  Photo ID: ${NAME} <br />
				  Contact No: ${NAME} <br />
				  Address: ${NAME} <br />
				  TIN: ${NAME} <br />
				  Ocupation: ${NAME} <br />
				  Blood Group: ${NAME} <br />
				  Religion: ${NAME} <br />
				</p>
			  </div>
			  <div class="column col-4 card bg-gray p-2 w100">
				<h5 class="h5 text-primary text-clip">Image</h5>
				<img src="" alt="No Data Found" srcset="">
			  </div>
			</div>
			<div class="columns">
  
  
			  <div class="column col-12 card bg-gray p-2 w100">
				<h5 class="h5 text-primary text-clip">Account Information</h5>
				<table class="table">
				  <thead>
					<tr>
  
					  <th class="text-tiny text-bold">SL</th>
					  <th class="text-tiny text-bold">Titel</th>
					  <th class="text-tiny text-bold">Type</th>
					  <th class="text-tiny text-bold">No</th>
					  <th class="text-tiny text-bold">Status</th>
					</tr>
				  </thead>
				  <tbody id="acinfo">
					<tr>
					  <td class="text-tiny">SL</td>
					  <td class="text-tiny">Titel</td>
					  <td class="text-tiny">Type</td>
					  <td class="text-tiny">No</td>
					  <td class="text-tiny">Status</td>
					</tr>
  
				  </tbody>
				</table>
  
  
  
  
				<h5 class="h5 text-primary text-clip p-2">Nominee Information</h5>
  
				<div class="columns" id="nominee">
  
				  <div class="column card m-1 col-4">
					<h6 class="h6 text-primary text-bold">
					  Name: ${NAME}
					</h6>
					<p class="text-tiny">
					  Father: ${NAME} <br />
					  Mother: ${NAME} <br />
					  Spouse: ${NAME} <br />
					  Date of Birth: ${NAME} <br />
					  Photo ID: ${NAME} <br />
					  Contact No: ${NAME} <br />
					  Address: ${NAME} <br />
					  Ocupation: ${NAME} <br />
					  Nominee Share: ${NAME} <br />
					  Type: ${NAME} <br />
					</p>
				  </div>
  
				</div>
				<div class="column col-12">
				  <div class="columns">
					<div class="column col-6">
					  <h5 class="h5 text-primary text-clip">Authorization Information</h5>
					  <h6 class="h6 text-clip">Reg Status</h6>
					  <p class="text-tiny" id="introducer">
						Reg Status: ${NAME} <br />
						Reg date: ${NAME} <br />
						Authorized By: ${NAME} <br />
						Last Updated By: ${NAME} <br />
						Link Account: ${NAME} <br />
						Agent: ${NAME} <br />
					  </p>
					</div>
					<div class="column col-6">
					  <h5 class="h5 text-primary text-clip">Introducer Information</h5>
					  <p class="text-tiny" id="introducer">
						Name: ${NAME} <br />
						Address: ${NAME} <br />
						Relation: ${NAME} <br />
						Contact No: ${NAME} <br />
					  </p>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>`
		})
	})

	document.getElementById('btn-loading').classList.remove('loading')
	document.getElementById('btnprint').classList.remove('disabled')
}