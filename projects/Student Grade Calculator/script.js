function calc(){

    let marks = [
        Number(document.getElementById("phy").value),
        Number(document.getElementById("chem").value),
        Number(document.getElementById("math").value),
        Number(document.getElementById("cs").value),
        Number(document.getElementById("eng").value)
    ];

    if(marks.some(mark => isNaN(mark) || mark < 0 || mark > 100)){
        alert("Please enter valid marks between 0 and 100.");
        return;
    }

    let total = marks.reduce((a,b)=>a+b,0);
    let percent = (total/500)*100;

    let grade;

    if(percent>=80)
        grade="A";
    else if(percent>=60)
        grade="B";
    else if(percent>=40)
        grade="C";
    else
        grade="F";

    let status = percent>=40
        ? "<span style='color:lime;'>PASS ✅</span>"
        : "<span style='color:red;'>FAIL ❌</span>";

    document.getElementById("result").innerHTML=`
        <strong>Total Marks:</strong> ${total}/500 <br>
        <strong>Percentage:</strong> ${percent.toFixed(2)}% <br>
        <strong>Grade:</strong> ${grade} <br>
        <strong>Status:</strong> ${status}
    `;
}