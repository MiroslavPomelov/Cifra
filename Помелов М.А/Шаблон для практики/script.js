let greet = document.getElementById('hello');
greet.textContent = 'Привет, я Мирослав';

let describe = document.getElementById("desc");
describe.textContent = 'Весна в этом году была поздней, зато дружной. В три дня снег, которого навалило очень уж много, превратился в ревущие потоки. Спустившись по многочисленным оврагам с гор, они устремились вниз, и река, умолкнувшая на всю зиму, закованная в двухметровую толщу несокрушимого, казалось бы, льда, в одну ночь вскрылась, пробудилась от спячки. Громовые раскаты лопающихся ледяных громадин прокатились над рекой. Освобожденная от оков, она двинулась навстречу потокам, соединилась с ними, затопляя все, что было выше её уровня: поляны, огороды и ближние избы.-повествовательное';


let service = document.getElementById("services");

for (let i = 0; i < 5; i++) {
    let newDiv = document.createElement('div');
    newDiv.style.border = '1px solid black';
    newDiv.style.borderRadius = '10px';
    newDiv.style.padding = '10px';
    newDiv.style.textAlign = 'center';
    newDiv.style.width = '50%';
    newDiv.style.flexWrap = 'wrap';


    let newH1 = document.createElement('h1');
    newH1.textContent = 'Фотография';
    let newP = document.createElement('p');
    newP.textContent = 'Предоставляю качественные услуги фотографии. Прайс: 1000руб.час'

    service.appendChild(newDiv);
    newDiv.appendChild(newH1);
    newDiv.appendChild(newP);
}