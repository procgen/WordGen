
var chain = {};
var words = ["sodium", "magnesium", "potassium", "helium", "lithium", "calcium", "yttrium", "titanium", "chromium", "palladium", "tantalum", "hafnium", "indium", "thallium", 
	"selenium", "gallium", "platinum", "polomium", "barium", "radium", "francium", "strontium", "rutherfordium", "dubnium", "seaborgium", "hassium", "copernicium", "uranium",
	"plutonium", "curium", "fermium", "nobelium", "erbium", "berkelium", "indium", "iridium", "lutetium", "meitnerium", "neobymium", "niobium", "osmium"];
var starts = [];

var MAX_LENGTH = 20;
var NGRAM = 2;

function saveSettings()
{
	MAX_LENGTH = $('#max_chars').val();
	NGRAM = parseInt($('input[name="ngramRadio"]:checked').val());

	var corpusText = $("#corpusTextArea").val();
	corpusText = corpusText.replace(/[\s]{2,}|[\n\r]+/g, " ");
	words = corpusText.split(" ");

	$('#myModal').modal('hide');
	chain = learnCorpus(words);
	showWord();
}

function getSettings()
{
	$('#max_chars').val(MAX_LENGTH);
	$('#ngramRadio' + NGRAM).prop("checked", "checked");
	var corpusText = "";
	for(var i = 0; i < words.length; i++)
	{
		corpusText += words[i] + " ";
	}
	$('#corpusTextArea').val(corpusText);
}

function learnWord(chain, word)
{
	starts.push(word.slice(0, NGRAM));
	for(var i = 0; i < word.length - NGRAM; i++)
	{
		var key = word.slice(i, i + NGRAM);
		if(chain[key] == null)
		{
			chain[key] = [word[i + NGRAM]];
		}
		else
		{
			chain[key].push(word[i + NGRAM]);
		}
	}
}

function buildWord(chain)
{
	var word = starts[Math.floor(Math.random() * starts.length)];
	while(true)
	{
		nextArray = chain[word.slice(-NGRAM)]
		if(nextArray == undefined)
			return word;
		next = nextArray[Math.floor(Math.random() * nextArray.length)]
		word += next;
		if(word.length >= MAX_LENGTH)
			return word;
	}
}

function learnCorpus(words)
{
	starts = [];
	var chain = {};
	for(var i = 0; i < words.length; i++)
	{
		learnWord(chain, words[i]);
	}
	console.log(chain);
	return chain;
}

function showWord()
{
	var word = buildWord(chain);
	word = word[0].toUpperCase() + word.slice(1);
	document.getElementById("word").textContent = word;
}


chain = learnCorpus(words);
showWord();
