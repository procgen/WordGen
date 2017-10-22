


var chain = {};
var words = ["sodium", "magnesium", "potassium", "helium", "lithium", "calcium", "yttrium", "titanium", "chromium", "palladium", "tantalum", "hafnium", "indium", "thallium", 
	"selenium", "gallium", "platinum", "polomium", "barium", "radium", "francium", "strontium", "rutherfordium", "dubnium", "seaborgium", "hassium", "copernicium", "uranium",
	"plutonium", "curium", "fermium", "nobelium", "erbium", "berkelium", "indium", "iridium", "lutetium", "meitnerium", "neobymium", "niobium", "osmium"];
var starts = [];

function learnWord(chain, word)
{
	starts.push(word.slice(0, 2));
	for(var i = 0; i < word.length - 2; i++)
	{
		var key = word.slice(i, i + 2);
		if(chain[key] == null)
		{
			chain[key] = [word[i + 2]];
		}
		else
		{
			chain[key].push(word[i + 2]);
		}
	}
	console.log(chain);
}

function buildWord(chain)
{
	var word = starts[Math.floor(Math.random() * starts.length)];
	while(true)
	{
		nextArray = chain[word.slice(-2)]
		if(nextArray == undefined)
			return word;
		next = nextArray[Math.floor(Math.random() * nextArray.length)]
		word += next;
		if(word.length > 30)
			return word;
		console.log(word);
	}
}

for(var i = 0; i < words.length; i++)
{
	learnWord(chain, words[i]);
}

function showWord()
{
	var word = buildWord(chain);
	word = word[0].toUpperCase() + word.slice(1);
	document.getElementById("word").textContent = word;
}

showWord();
