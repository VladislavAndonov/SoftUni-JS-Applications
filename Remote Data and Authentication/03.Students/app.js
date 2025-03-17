document.addEventListener("DOMContentLoaded", function() {
    showInfo();
  });
  
  const [firstNameRef, lastNameRef, facultyNumberRef, gradeRef] = Array.from(
    document.querySelectorAll("input[type='text']")
  );
  const baseUrl = "http://localhost:3030/jsonstore/collections/students";
  
  const submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", submitInfo);
  
  const tbodyRef = document.getElementById("results").querySelector("tbody");
  
  async function submitInfo(e) {
    e.preventDefault();
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let facultyNumber = facultyNumberRef.value;
    let grade = gradeRef.value;
  
    let data = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, facultyNumber, grade }),
    };
  
    if (firstName && lastName && facultyNumber && grade) {
      await fetch(baseUrl, data);
    }
    firstNameRef.value = "";
    lastNameRef.value = "";
    facultyNumberRef.value = "";
    gradeRef.value = "";
  
    showInfo();
  }
  
  async function showInfo() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    tbodyRef.innerHTML = "";
    Object.values(data).forEach((el) => {
      createTableData(el);
    });
  }
  
  function createTableData(data) {
    const trow = document.createElement("tr");
    
    const firstNameInfo = document.createElement("td");
    const lastNameInfo = document.createElement("td");
    const facultyNumberInfo = document.createElement("td");
    const gradeInfo = document.createElement("td");
  
    firstNameInfo.textContent = data.firstName;
    lastNameInfo.textContent = data.lastName;
    facultyNumberInfo.textContent = data.facultyNumber;
    gradeInfo.textContent = Number(data.grade);
  
    trow.appendChild(firstNameInfo);
    trow.appendChild(lastNameInfo);
    trow.appendChild(facultyNumberInfo);
    trow.appendChild(gradeInfo);
  
    tbodyRef.appendChild(trow);
  }