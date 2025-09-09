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

    public function create(){
        return Inertia::render('Products/Create');
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric]',
            'description' => 'nullable|string'
        ]);
    }
}
