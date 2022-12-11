// node_module imports
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// component imports
import AboutCreator from 'components/aboutcreator/aboutcreator';

import AllBlogs         from    'components/blogs/allblogs';
import Blog             from    'components/blogs/blog';
import BlogEdit         from    'components/blogs/blogedit';
import MyBlogs          from    'components/blogs/myblogs';
import NewBlog          from    'components/blogs/newblog';

import NotFound         from    'components/errors/notFound';

import Help             from    'components/help/help';

import Signin            from    'components/login/login';

import Navbar           from    'components/navbar/navbar';

import MyProfile        from    'components/profiles/myprofile';
import Profile          from    'components/profiles/profile';

import { RequireAuth }  from    'components/requireAuth/requireAuth';


function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navbar/>}>
                    <Route index                        element={<AllBlogs/>}/>
                    <Route path="/profile"              element={<RequireAuth> <MyProfile/> </RequireAuth>}/>
                    <Route path="/create"               element={<RequireAuth> <NewBlog/> </RequireAuth>}/>
                    <Route path="/myblogs"              element={<RequireAuth> <MyBlogs/> </RequireAuth>}/>
                    <Route path="/blog/:blogID"         element={<Blog/>}/>
                    <Route path="/blog/edit/:blogID"    element={<BlogEdit/>}/>
                    <Route path="/profile/:userID"      element={<Profile/>}/>
                    <Route path="/about"                element={<AboutCreator/>}/>
                    <Route path="/help"                 element={<Help/>}/>
                    <Route path="*"                     element={<NotFound/>}/>
                </Route>
                <Route path="/signin"                   element={<Signin/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
