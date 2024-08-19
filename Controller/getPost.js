const Blogpost= require('../modal/Blogpost')

module.exports= async (req,res)=>{
     const blogposts =await Blogpost.findById(req.params.id).populate('userid');
     console.log(blogposts)
     res.render('post',{
        blogposts
     })
}