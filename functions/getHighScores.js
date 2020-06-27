require("dotenv").config();
const Airtable = require("airtable");

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
});

const base = require("airtable").base(process.env.AIRTABLE_API_BASE);
const table = base.table(process.env.AIRTABLE_BASE_TABLE);

exports.handler = async (event) => {
    try {
        const records = await table.select({}).firstPage();
        const formattedRecords = records.map((record) => ({
            id: record.id,
            fields: record.fields,
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(formattedRecords),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ e: "Couldn't connect to database" }),
        };
    }
};
