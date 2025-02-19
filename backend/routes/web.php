<?php

use Illuminate\Support\Facades\Route;

Route::get("/", function(){ return response()->json(['success' => true ]); });

require __DIR__ . '/api.php';
