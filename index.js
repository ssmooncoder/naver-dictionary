const queryField = document.getElementById('query-field');
const searchButton = document.getElementById('define-btn');
const meaningField = document.getElementById('meaning');
const searchURI = 'https://ac-dict.naver.com/enko/ac?st=11&r_lt=11&q=';


const getTemplate = async () => {
    const response = await fetch('template.html');
    const template = await response.text();
    return template;
};

const search = async () => {
    console.log('ayy lmao');
    const encoded = encodeURIComponent(queryField.value);
    const searchString = searchURI + encoded;
    const response = await fetch(searchString);
    const jsonData = await response.json();
    
    const cleanedJson = cleanJsonData(jsonData);
    
    const template = await getTemplate();
    const output = Mustache.render(template, cleanedJson);
    meaningField.innerHTML = output;
};

const cleanJsonData = (jsonData) => {
    const cleanedJson = {
        results: []
    };
    
    jsonData.items[0].forEach((element) => {
        cleanedJson.results.push({
            word: element[0],
            definition: element[2]
        });
    });
    
    return cleanedJson;
}

queryField.addEventListener('keydown', (e) => {
    e.key === 'Enter' && search();
});

searchButton.addEventListener('click', search);