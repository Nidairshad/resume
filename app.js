require("dotenv").config();
const githubService = require("./services/githubService");

const express = require("express");
const PORT =3000;
const app = express();
//-----------
const GITHUB_USERNAME = "Nidairshad";
//-------------
app.use(express.static("public"));
app.set("view engine","ejs");


//const data :

 const profile = {
        name: "Nida Irshad",
        bio: "I work on mostly backend development."
    };

    const skills = [
    "C",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Linux",
    "Git"
    ];

    const contact = {
    email :"nidairshad1234@gmail.com",
    github:"https://github.com/Nidairshad",
    linkedin:"https://www.linkedin.com/in/nida-irshad-59704727a/"
}
//------------

//home route
app.get("/", async (req, res) => {
    try{
    console.log("route is reached");

const repositories =
await githubService.getRepositories(GITHUB_USERNAME);

const recentProjects =
githubService.getRecentProjects(repositories);

const topProjects =
githubService.getTopProjects(repositories);

res.render("about",{

    profile,

    skills,

    recentProjects,

    projects:topProjects,

    contact

});
    }
    catch(err){
        console.error(err);
        res.status(500).send("something went wrong.",err.message);
    }
});

app.listen(PORT, () =>{
console.log(`app is running on ${PORT}`);
});

