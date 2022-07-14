const {fromEvent, of} = rxjs;
const {map, debounceTime, distinctUntilChanged, switchMap, mergeMap, filter, onErrorResumeNext, delay} = rxjs.operators;

const temaInput = document.getElementById('tema');
const talalatok = document.getElementById('talalatok');
fromEvent(temaInput, 'input')
    .pipe(
        map(() => temaInput.value),
        debounceTime(1_000),
        distinctUntilChanged(),
        // switchMap(fakeSearch),
        switchMap(duckDuckGo), // Promise
        switchMap(r => r.json()), // Promise
        // filter(j => j.AbstractURL)
    ).subscribe(t => talalatok.appendChild(linkedList(t.AbstractURL)));

function duckDuckGo(tema) {
    return fetch(`https://api.duckduckgo.com/?q=${tema}&format=json`);
}

function fakeSearch(tema) {
    const resp = {
        Abstract: `Ez egy érdekes téma: ${tema}`
    };
    return of(resp).pipe(delay(1_000));
}

function linkedList(url) {
    let text = document.createTextNode(url);
    let a = document.createElement('a');
    a.setAttribute('href', url);
    a.appendChild(text);
    let li = document.createElement('li');
    li.appendChild(a);
    return li;
}