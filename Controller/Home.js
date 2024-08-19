const Blogpost =require('../modal/Blogpost')

module.exports=async(req,res)=> {
     
    const blogposts= await Blogpost.find({}).populate('userid');
    console.log(req.session)
    res.render('index',{blogposts})
}