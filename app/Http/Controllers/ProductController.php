<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Termwind\render;

class ProductController extends Controller
{
    public function index(){
        return Inertia::render('Products/Index', []);
    }
}
