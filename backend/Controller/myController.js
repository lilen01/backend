const fs = require('fs');
const fh = require('fs/promises');

let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

const userModelPath = './Model/user.json';
const cartModelPath = './Model/cart.json';

// get all all users from user.json
getAllUser = (req, res) => {
    fs.readFile(userModelPath, 'utf8', (err, data) => {
        if (err) {
            console.log("Error: ", err);
            res.status(404).send("404 Page Not Found");
        } else {
            data = JSON.parse(data);        // parsing json from string
            res.json(data);                 // sending in JSON format
        }
    });
};

// get user by username from user.json model
getUserByUserName = (req, res) => {
    var username = req.params.user;
    fs.readFile(userModelPath, 'utf8', (err, data) => {
        if (err) {
            console.log("Error: ", err);
            res.status(404).send("Page Not found");
        } else {
            var jsonData = JSON.parse(data);
            jsonData = jsonData.find(item => item.userName == username);
            res.json(jsonData);
        }
    });
};

// add new user data into user.json model
// addUser = (req, res) => {
//     let newUser = req.body;
//     var file = fs.readFileSync(userModelPath, 'utf8');
//     var jsonData = JSON.parse(file);
//     jsonData.push(newUser);

//     // fs.writeFileSync(userModelPath, JSON.stringify(jsonData, null, 2));
//     // res.json(newUser);

//     fs.writeFile(userModelPath, JSON.stringify(jsonData, null, 2), (err, data) => {
//         if (err) {
//             console.log("Error: ", err);
//         } else {
//             console.log("Written successfully");
//             res.status(200).json(newUser);
//         }
//     })
// };

// POST new item
addUser = async (req, res) => {
    // const data = await fs.readFile(userModelPath, 'utf8');
    // res.status(200).json(data);
    try {
        const data = await fh.readFile(userModelPath, 'utf8');
        const newItem = { ...req.body };
        var jsonData = JSON.parse(data);
        jsonData.push(newItem);
        await fh.writeFile(userModelPath, JSON.stringify(jsonData, null, 2));
        res.status(200).json(newItem);
        // res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create item' });
    }
};

// Update existing user data from user.json Model
updateUser = async (req, res) => {
    let userUpdate = req.body;
    var username = req.params.username
    var file = await fh.readFile(userModelPath, 'utf8');    // in string format
    var jsonData = JSON.parse(file);        // converted into json 

    

    jsonData.push(newUser);

    // fs.writeFileSync(userModelPath, JSON.stringify(jsonData, null, 2));
    // res.json(newUser);

    fs.writeFile(userModelPath, JSON.stringify(jsonData, null, 2), (err, data) => {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log("Written successfully");
            res.status(200).json(newUser);
        }
    })
};


module.exports = {
    getAllUser,
    getUserByUserName,
    addUser
};