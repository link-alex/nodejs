/**
 * Split csv line to row items
 * @param  {String} line csv row like '1,Bumetanid1,Bumetanide,158995707-5'
 * @return {Array<String>}      array of splitted strings like ['1','Bumetanid1','Bumetanide','158995707-5']
 */
function splitLineToTokens(line) {
    const tokens = [];
    let nextTokenStart = 0;
    let token;
    let i = 0;
    let isCurrentTokenString = false;

    for (; i < line.length; i++) {
        if (line[i] === ',') {
            if (isCurrentTokenString) {
                if (line[i - 1] === '"') {
                    token = line.substring(nextTokenStart, i - 1).trim();
                    tokens.push(token);
                    isCurrentTokenString = false;
                    nextTokenStart = i + 1;
                }
            } else {
                token = line.substring(nextTokenStart, i).trim();
                tokens.push(token);
                nextTokenStart = i + 1;
            }

            if (line[i + 1]  === '"') {
                isCurrentTokenString = true;
                nextTokenStart = i + 2;
            }
        }
    }

    token = line.substring(nextTokenStart, i);
    tokens.push(token);

    return tokens;
}

/**
 * convert CSV file to json
 * @param  {String} data content of CSV file as a String
 * @return {String}      stringified json data
 */
function convertCSVToJSON(data) {
    const result = [];
    const lines = data.split('\n');
    const keys = splitLineToTokens(lines[0]);
    const keysNumber = keys.length;
    let values;
    let i = 1, j;
    let valueLine;
    let obj;

    for (; i < lines.length; i++) {
        valueLine = lines[i];

        if (valueLine) {
            values = splitLineToTokens(valueLine);

            if (keysNumber === values.length) {
                obj = {};
                for (j = 0; j < keys.length; j++) {
                    obj[keys[j]] = values[j];
                }
                result.push(obj);
            } else {
                console.error(`Parsing gone wrong for ${valueLine}`);
            }
        }
    }
    return JSON.stringify(result);
}

export { convertCSVToJSON };
