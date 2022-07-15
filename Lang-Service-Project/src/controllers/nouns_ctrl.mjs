import mysql from 'mysql';

var con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "test2020_",
    multipleStatements: "true"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

  });

  export const getNouns = (req, res) => {

    execSQLQuery(res);

  }

  async function execSQLQuery(res) {
    await new Promise((resolve, reject) => {
      console.log('First Promise');

      const sql = 'select * from lang.noun';
      con.query(sql, (err, nounsResult, fields) => {
          let result = nounsResult;

          if (err) reject(err);

          resolve(result);

      });

    }).then((firstQueryResult) => {

      return new Promise((resolve, reject) => {
        console.log('Second Promise');

        const toLang = 'bg';
        let words = '';
  
        for (let i = 0; i < firstQueryResult.length; i++) {
          words += `'${firstQueryResult[i].name}'`;
          if (i < (firstQueryResult.length - 1)) {
            words += ','
          }
        }

        console.log('words: ' + words);

        const translSql = `select * from lang.translation where from_lang='ar' and to_lang='${toLang}' and word in (${words})`;
        const query = con.query(translSql, (err, translationsResult, fields) => {
          console.log(err);

          if (err) reject(err);

          
          // console.log(translationsResult);

          firstQueryResult.forEach(el => {
            el.translations = translationsResult.filter(element => el.name === element.word).map(elN => elN.translation);
          });

          // console.log('in:' + firstQueryResult);
  
          resolve(firstQueryResult);
        });
  
        
        
      });
    }).then((resultWithTranslations) => {
      // console.log('sending:' + resultWithTranslations);
      res.send(resultWithTranslations);
    });
  }