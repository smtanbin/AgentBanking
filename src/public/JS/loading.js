document.onreadystatechange = function() {
	setTimeout(() => {
		document.getElementById('loader').style.display =
			document.getElementById('loader').style.display === 'none' ? '' : 'none'
		document.getElementById('loading').style.display = 'none'
	})
}
// 	setTimeout(() => {
// 		document.getElementById('loader').style.display =
// 			document.getElementById('loader').style.display === 'none' ? '' : 'none'
// 		document.getElementById('loading').style.display = 'none'
// 	}, 2000)
// }
