
function getValues() {
    let loanAmount = document.getElementById('loanAmount').value;
    let termLength = document.getElementById('termLength').value;
    let interestRate = document.getElementById('interestRate').value;

    if (Number.isNaN(loanAmount) || Number.isNaN(termLength) || Number.isNaN(interestRate)) {

        Swal.fire(
            {
                icon: 'error',
                title: 'Oops!',
                text: 'Only positive integers are allowed!'
            }

        );

    } else {

        let info = calculateMortgage(loanAmount, termLength, interestRate);
        displayInfo(info, termLength);

    }

}

function calculateMortgage(amount, term, rate) {
    let monthlyPayment = (amount * (rate / 1200)) / (1 - Math.pow((1 + rate / 1200), -term));

    rate = rate / 1200;

    let tableInfo = [];

    let totalInterest = 0;
    let totalPrincipal = 0;
    let remainingBalance = amount;

    for (let i = 1; i <= term; i++) {

        remainingBalance = remainingBalance;
        let month = i;
        let payment = monthlyPayment;
        let interest = remainingBalance * rate;
        let principal = payment - interest;
        remainingBalance -= principal;
        totalInterest += interest;
        totalPrincipal += principal;

        let tableRow = {
            month: month,
            payment: payment,
            principal: principal,
            interest: interest,
            totalInterest: totalInterest,
            remainingBalance: Math.abs(remainingBalance),
            monthlyPayment: monthlyPayment,
            totalPrincipal: totalPrincipal
        };

        tableInfo.push(tableRow);

    }

    return tableInfo;

}

function displayInfo(info, term, amount) {
    let paymentAmount = document.getElementById('paymentAmount');
    let totalPrincipal = document.getElementById('totalPrincipal');
    let totalInterest = document.getElementById('totalInterest');
    let totalCost = document.getElementById('totalCost');
    let tableBody = document.getElementById('mortgageTable');

    const loanTableTemplate = document.getElementById('loanTableTemplate');

    tableBody.innerHTML = '';

    for (let i = 0; i < term; i++) {

        let appRow = document.importNode(loanTableTemplate.content, true);

        let tableCells = appRow.querySelectorAll('td');

        tableCells[0].textContent = info[i].month;
        tableCells[1].textContent = info[i].payment.toLocaleString("en-US", { style: "currency", currency: "USD" });
        tableCells[2].textContent = info[i].principal.toLocaleString("en-US", { style: "currency", currency: "USD" });
        tableCells[3].textContent = info[i].interest.toLocaleString("en-US", { style: "currency", currency: "USD" });
        tableCells[4].textContent = info[i].totalInterest.toLocaleString("en-US", { style: "currency", currency: "USD" });
        tableCells[5].textContent = info[i].remainingBalance.toLocaleString("en-US", { style: "currency", currency: "USD" });

        tableBody.appendChild(appRow);

    }

    paymentAmount.textContent = info[0].payment.toLocaleString("en-US", { style: "currency", currency: "USD" });
    totalPrincipal.textContent = info[term - 1].totalPrincipal.toLocaleString("en-US", { style: "currency", currency: "USD" })
    totalInterest.textContent = info[term - 1].totalInterest.toLocaleString("en-US", { style: "currency", currency: "USD" })
    totalCost.textContent = (info[term - 1].totalPrincipal + info[term - 1].totalInterest).toLocaleString("en-US", { style: "currency", currency: "USD" })

}
