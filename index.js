const express = require('express');
const app = express();
const path = require('path');

const userSchema = require('./model/user');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render("index");

});

app.get('/show', async (req,res)=>{
    const user =await userSchema.find();
    console.log(user);
    res.render("card",{user : user});
})

app.get('/delete/:idname', async (req,res)=>{
    const user =await userSchema.findOneAndDelete({_id:req.params.idname});
    // console.log(user);
    res.redirect("/show");
})

app.get('/edit/:idname', async (req,res)=>{
    const user =await userSchema.findOne({_id:req.params.idname});
    res.render("edit",{user : user});
    });


    app.post('/update/:idname', async (req,res)=>{
        const user =await userSchema.findOneAndUpdate({_id:req.params.idname},{
            name:req.body.name,
            url:req.body.url,
            nickname:req.body.nickname
            
        },{new:true});
        res.redirect("/show");
    
        })


app.post('/create',async (req,res)=>{
   let user = await userSchema.create({
        name : req.body.name,
        nickname : req.body.nickname,
        url : req.body.url
    });

    res.redirect("/show");
});

app.listen(3000);