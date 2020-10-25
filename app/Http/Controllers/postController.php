<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\post;

class postController extends Controller
{
    public function save(Request $request) {

        $post = new post();

        $post->fname = $request->fname;
        $post->sname = $request->sname;
        $post->email = $request->email;
        $post->mobile = $request->mobile;
        $post->gender = $request->gender;
        $post->dob = $request->dob;
        $post->comments = $request->comments;

        $post->save();

        return $request->all();
    }
}
