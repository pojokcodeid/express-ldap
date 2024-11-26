import express from 'express';
import bodyParser from 'body-parser';
import LdapAuth from 'ldapauth-fork';

const app = express();
app.use(bodyParser.json());

const options = {
  url: 'ldap://ldap.forumsys.com:389',
  bindDN: 'cn=read-only-admin,dc=example,dc=com',
  bindCredentials: 'password',
  searchBase: 'dc=example,dc=com',
  searchFilter: '(uid={{username}})'
};

const auth = new LdapAuth(options);

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  auth.authenticate(username, password, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Autentikasi gagal', error: err });
    }

    // Jika autentikasi berhasil, lakukan sesuatu di sini
    res.json({ message: 'Autentikasi berhasil', user });
  });
});

app.listen(3000, () => {
  console.log('Server berjalan di port http://localhost:3000');
});

// acess
// http://localhost:3000/login

// body
// {
//   "username":"riemann",
//   "password":"password"
// }
