const title = document.querySelector('.title')
const autho = document.querySelector('h3')
const text = document.querySelector('.text')
const btn = document.querySelector('.btn')
function getPoet(array) {
	return array[Math.floor((Math.random() * array.length))]
}

function getPoem(array) {
		return array[Math.floor((Math.random() * array.length))]
	
}

function generateAuthors() {
	console.log('started generating')
	btn.disabled = true
    const author = getPoet(poets)
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = `https://thundercomb-poetry-db-v1.p.mashape.com/author/${author}
`
    


    xhr.open(method, url)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
        	const resp = JSON.parse(xhr.responseText)
        	const poem = resp.filter(curr => curr.linecount < 30)
        	if(poem.length === 0) generateAuthors();
        	const final = poem[Math.floor((Math.random() * poem.length))]
        		console.log(resp)
        		console.log(poem)
        		console.log(final)
        		const atr = final.author


        		autho.textContent = atr
        		title.textContent = final.title;
        		text.innerHTML = `
						${final.lines.reduce((prev,curr) => {
							return prev + curr + '<br>'
						},'')}
        		`
       

        		btn.disabled = false
        	
        	
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
        	console.log(title)
            console.log(xhr.responseText)
            
        }
    }
    xhr.setRequestHeader("X-Mashape-Authorization", "PEx110iLx4mshmIPl9i434TzhtRTp1rRoJsjsnpTywUy7ytoG6")
    xhr.send()
}

generateAuthors()


btn.addEventListener('click', generateAuthors)

