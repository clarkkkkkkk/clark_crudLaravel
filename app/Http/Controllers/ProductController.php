<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Termwind\render;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return Inertia::render('Products/Index', compact('products'));
    }

    public function create(){
        return Inertia::render('Products/Create');
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string'
        ]);

        Product::create($request->all());
        return redirect()->route('products.index')->with('message', 'Product created succesfully');
    }
}
