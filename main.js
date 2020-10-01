var wordContainer = document.getElementById('word')
var errorWordContainer = document.getElementById('error')
var words = ['Телефон','Телевизор']
var randomWords = words[Math.floor(Math.random() * words.length)]
var counter = randomWords.length
var figureParts = document.querySelectorAll('.figure-part')

var currentWords = []
var wrongWords = []

var playble = true

console.log(errorWordContainer);


function displayWord() {

    wordContainer.innerHTML = `
    ${randomWords.split('').map(leters => `
        <span class="word-item">
            ${currentWords.includes(leters) ? leters : ''}
        </span>
    `).join('')}

    `;

    const innerWord = wordContainer.innerText.replace(/\n/g,"")

    if(innerWord === randomWords){
        playble = false

        setTimeout(function(){
            alert(`Поздравляю! Это слово ${innerWord}`);
        }, 100)
    }
}

function updateWrongsEl() {
    errorWordContainer.innerHTML = `
    ${wrongWords.length > 0 ? '<h2>Мимо</h2>' : ''}
    ${wrongWords.map(leter => `<span>${leter}</span>`)}
    `;

    figureParts.forEach(function(item, index){
        var errors = wrongWords.length

        if(index < errors){
            item.style.display = "block"
        }else{
            item.style.display = "none"
        }
    })

    if(wrongWords.length === figureParts.length){

        setTimeout(function(){
            alert('Вы проиграли((( Перезагрузите страницу чтобы заново начать игру');
        }, 100)

        playble = false
    }
        
}

window.addEventListener('keydown', function(e){

    if(playble){

        if(e.keyCode >= 65 && e.keyCode <= 90){
            const leter = e.key

            if(randomWords.includes(leter)){
                
                if(currentWords.includes(leter)){
                    alert('Эта буква уже отгадана')
                }else{
                    currentWords.push(leter)
                    displayWord()
                }
            }else{
                wrongWords.push(leter)
                updateWrongsEl()
            }
        }
    }

    
})


displayWord()