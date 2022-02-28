/* Calling Oracle Database*/
require('dotenv').config()

const oracledb = require('oracledb')
/* This one very importent. In make sure the output.
*/
// const oracleClient = require('./dep/oracle/client/instantclient')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
let connection

async function qurrythis(sqlqurry) {
	try {
		// oracledb.initOracleClient({ libDir: oracleClient })
		connection = await oracledb.getConnection({
			user: 'tanbin',
			password: '@urA774234',
			connectString: '10.130.102.103:1525/SBLABS'
		})
		const result = await connection.execute(sqlqurry)
		return result.rows
	} catch (err) {
		console.log('Function qurrythis face a error!')
		console.error(err)
	} finally {
		if (connection) {
			try {
				await connection.close()
			} catch (err) {
				console.log('Function connection.close() face a error!')
				// console.error(err)
			}
		}
	}
}

/* Copyright (c) 2015, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   select1.js
 *
 * DESCRIPTION
 *   Executes a basic query.
 *   Uses Oracle's sample HR schema.
 *
 *   Scripts to create the HR schema can be found at:
 *   https://github.com/oracle/db-sample-schemas
 *
 *****************************************************************************/

//   function qurrythis(sqlqurry) {
//  oracledb.getConnection(
//    {
// 	user: 'tanbin',
// 	password: '@urA774234',
// 	connectString: '10.130.102.103:1525/SBLABS'
//    },
//    function(err, connection)
//    {
// 	 if (err) {
// 	   console.error(err.message);
// 	   return;
// 	 }
// 	  connection.execute(sqlqurry,  [180],
// 	   function(err, result)
// 	   {
// 		 if (err) {
// 		   console.error(err.message);
// 		   doRelease(connection);
// 		   return;
// 		 }
// 		const result = await connection.execute(sqlqurry)
// 		doRelease(connection);
// 		return result.rows
// 	   });
//    });
// }

//  function doRelease(connection)
//  {
//    connection.release(
// 	 function(err) {
// 	   if (err) {
// 		 console.error(err.message);
// 	   }
// 	 });
//  }
module.exports = qurrythis
