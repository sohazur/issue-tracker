document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => parseInt(issue.id) === id);
  currentIssue.status = "Closed";
  document.getElementById(`status-${id}`).innerText = currentIssue.status;
  document.getElementById(`status-${id}`).style.backgroundColor = "tomato";
  document.getElementById(`description-${id}`).style.textDecoration =
    "line-through";
  localStorage.setItem("issues", JSON.stringify(issues));
  // fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => parseInt(issue.id) !== id);
  const div = document.getElementById(`issue-${id}`);
  document.getElementById("issuesList").removeChild(div);
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  // console.log(issues[issues.length - 1].id);
  const issuesList = document.getElementById("issuesList");
  // issuesList.innerHTML = "";

  // for (var i = 0; i < issues.length; i++) {
  //   const { id, description, severity, assignedTo, status } = issues[i];
  const div = document.createElement("div");
  div.innerHTML = `<div id="issue-${issues[issues.length - 1].id}" class="well">
                              <h6>Issue ID: ${
                                issues[issues.length - 1].id
                              } </h6>
                              <p><span id="status-${
                                issues[issues.length - 1].id
                              }" class="label label-info"> ${
    issues[issues.length - 1].status
  } </span></p>
                              <h3 id="description-${
                                issues[issues.length - 1].id
                              }"> ${issues[issues.length - 1].description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${
                                issues[issues.length - 1].severity
                              }</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${
                                issues[issues.length - 1].assignedTo
                              }</p>
                              <a href="#" onclick="closeIssue(${
                                issues[issues.length - 1].id
                              })" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${
                                issues[issues.length - 1].id
                              })" class="btn btn-danger">Delete</a>
                              </div>`;
  issuesList.appendChild(div);
  // }
};
