function getMonthAdmin() { //년과 월에 따라 마지막 일 구하기 
    var year = document.getElementById('select_year');
    var month = document.getElementById('select_month');
    
    var yearSelected = year.options[year.selectedIndex].text;
    var monthSelected = month.options[month.selectedIndex].text;

    var termDate = yearSelected + '년 ' + monthSelected + '월의 사용 기록 내역을 조회합니다.';
    document.getElementById("termDate").innerHTML = termDate;
}