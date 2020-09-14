let weight = document.querySelector('.weight');
let height = document.querySelector('.height');
let send = document.querySelector('.send');
let content = document.querySelector('.content');
let data = [];
let dataString = JSON.stringify(data);
let storage = localStorage.setItem('bmiData', dataString);
let time = new Date();
let year = time.getFullYear();
let month = (time.getMonth() + 1 < 10 ? '0' : '') + (time.getMonth() + 1);
let date = time.getDate();

send.addEventListener('click', bmiCount);
content.addEventListener('click', removeOne);

function removeOne(e) {
    if (e.target.id == "deleteOne") {
        let id = e.target.parentNode.dataset.id;
        let newIndex = 0;
        data.forEach(function (item, key) {
            if (id == item.id) {
                newIndex = key;
            }
        })
        data.splice(newIndex, 1);
    }
    render(data);
    dataString = JSON.stringify(data);
    storage = localStorage.setItem('bmiData', dataString);
};

function bmiCount(e) {
    e.preventDefault();
    let h = Number(weight.value);
    let w = Number(height.value);
    let bmi = (w / Math.pow(h / 100, 2)).toFixed(2);
    if (bmi > 0 && bmi <= 18.5) {
        addData("blue", "體重過輕", bmi)
    } else if (bmi > 18.5 && bmi <= 25) {
        addData("green", "正常", bmi)
    } else if (bmi > 25 && bmi <= 30) {
        addData("orange", "過重", bmi)
    } else if (bmi > 30 && bmi <= 35) {
        addData("redOrange", "輕度肥胖", bmi);
    } else if (bmi > 35 && bmi <= 40) {
        addData("redOrange", "中度肥胖", bmi);
    } else if (bmi > 40) {
        addData("red", "重度肥胖", bmi);
    } else {
        alert('Please input correct value');
    };
    height.value = '';
    weight.value = '';
    render(data);
};

function addData(status, result, bmi) {
    let timeStamp = Date.now();
    data.push({
        height: height.value,
        weight: weight.value,
        bmi: bmi,
        result: result,
        status: status,
        id: timeStamp,
    });
    dataString = JSON.stringify(data);
    storage = localStorage.setItem('bmiData', dataString);
};

function render(data) {
    let str = '';
    let str1 = '';
    data.forEach(function (item) {
        str += `
        <div class="box d-flex ${item.status} justify-content-between align-items-center" data-id="${item.id}">
          <p class="fs20 mr-auto font-weight-bold">${item.result}</p>
          <p class="fs12">BMI  <span class="fs20">${item.bmi}</span></p>
          <p class="fs12 ml32">weight  <span class="fs20">${item.weight}kg</span></p>
          <p class="fs12 ml32">height  <span class="fs20">${item.height}cm</span> </p>
          <p class="ml52">${month}-${date}-${year}</p>
          <button type="button" class="btn btn-danger ml12 deleteOne" id="deleteOne">刪除</button>
        </div>
        `;
        str1 = `
        <div class="circle d-flex justify-content-center align-items-center flex-column ${item.status}C bg ${item.status}F">
          <p class="fs32">${item.bmi}</p>
          <p class="fs14">BMI</p>
          <img src="./images/icons_loop.png" alt="" class="circleImg ${item.status}B"/>
        </div>`;
    });
    content.innerHTML = str;
    send.innerHTML = str1;
};
