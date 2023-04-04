/* eslint-disable no-console */
var request = require('request');
import moment from 'moment';
moment.locale('en-ca');

const getClientAvailableBalance = () => {
    const options = {
        method: 'GET',
        url: 'https://rc-api.vamosgg.com/api/v1/report/withdrawals/balance',
        headers: {
            Content: 'application/json',
            Accept: 'application/json',
        },
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        return response.body;
    });
};

const getCurrentDate = () => {
    return moment().format('L');
};

const getMonthDayYear = (today) => {
    let value = today.split('/');
    return {
        dd: value[1],
        mm: value[0],
        yyyy: value[2],
    };
};

const addRemoveDaysFromCurrentDate = (action, days) => {
    switch (action) {
        case '+':
            return moment().add(days, 'days').calendar();
            break;

        case '-':
            return moment().subtract(days, 'days').calendar();
            break;
        default:
            break;
    }
};

const validateTableColumns = (columns, tableName) => {
    console.table(`Columns: \n ${columns} \n`);
    console.log(`Table Name: \n ${tableName} \n`);

    cy.getByTestId(tableName)
        .getTable()
        .should((tableData) => {
            console.log(`Table Data: \n ${tableData} \n`);

            const tableColumn = Object.keys(tableData[0]).map((k) => k.toUpperCase());
            columns.forEach((column) => {
                expect(tableColumn).to.include(column.toUpperCase());
            });
        });
};
const getLaterTime = (numOfDays) => {
    let tempData = [];
    let date = new Date();
    date.setHours(date.getHours());
    date.setDate(date.getDate() + numOfDays);
    tempData.push(date.getMonth() + 1);
    tempData.push(date.getDate());
    tempData.push(date.getFullYear());
    let local12hr = new Date(date.toISOString()).toLocaleTimeString('en-US', {
        timezone: 'UTC',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
    });
    tempData.push(parseInt(local12hr.split(':')[0]));
    tempData.push(date.getMinutes());
    tempData.push(local12hr.substring(local12hr.indexOf(' ')).replace(' ', ''));
    return tempData;
}

function setUITime(timeData){

    for (let i = 0; i < 2; i++) {
        for (let j = 2; j < 7; j++) {
            cy.get('.date-wrapper input:nth-of-type(' + j + ')')
                .eq(i)
                .click()
                .type(timeData[i][j - 2]);
        }
        cy.get('.react-datetimerange-picker select').eq(i).select(timeData[i][5]);
    }
    cy.get('.btn-apply').click();
}

function tableUIRetry(){
    let remainingAttempts = 4;
    function waitUntilTableExists() {
        let $table = Cypress.$('table');
        if ($table.length) {
            return $table;
        }

        if (--remainingAttempts) {
            cy.log('Table not found yet. Remaining attempts: ' + remainingAttempts);
            cy.reload();
            cy.get('.tab-controls > button:nth-child(2)').click();
            return cy.wait(2000).then(() => {
                return waitUntilTableExists();
            });
        }
        throw Error('Table was not found.');
    }
    waitUntilTableExists().then($table => {
        cy.log('table present in UI' );
    });
}

const getPreviousDay = (date = new Date()) => {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  }

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    getClientAvailableBalance,
    getCurrentDate,
    addRemoveDaysFromCurrentDate,
    getMonthDayYear,
    validateTableColumns,
    getLaterTime,
    setUITime,
    getPreviousDay,
    tableUIRetry,
    randomNumber,
};
