<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class DishController extends Controller
{
    // File paths
    private $dishcussingFilePath;
    private $dishCommentsFilePath;

    public function __construct()
    {
        $this->dishcussingFilePath = storage_path('app/serverfiles/dishcussings.json');
        $this->dishCommentsFilePath = storage_path('app/serverfiles/dishComments.json');
    }

    public function getDishcussings()
    {
        if (!File::exists($this->dishcussingFilePath)) {
            return response()->json([], 200);
        }

        try {
            $data = File::get($this->dishcussingFilePath);
            $dishcussings = json_decode($data, true);
            return response()->json($dishcussings, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error reading file'], 500);
        }
    }

    public function getDishComments()
    {
        if (!File::exists($this->dishCommentsFilePath)) {
            return response()->json([], 200);
        }

        try {
            $data = File::get($this->dishCommentsFilePath);
            $dishComments = json_decode($data, true);
            return response()->json($dishComments, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error reading file'], 500);
        }
    }

    public function saveDishcussing(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'text' => 'required',
            'user' => 'required',
            'tag' => 'required',
        ]);

        $newDishcussing = $request->only(['id', 'title', 'text', 'user', 'datetime', 'tag', 'likes', 'comments']);

        try {
            $data = File::exists($this->dishcussingFilePath) ? File::get($this->dishcussingFilePath) : '[]';
            $dishcussings = json_decode($data, true);
            $dishcussings[] = $newDishcussing;

            File::put($this->dishcussingFilePath, json_encode($dishcussings, JSON_PRETTY_PRINT));

            return response()->json(['message' => 'Dishcussing saved successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error saving data'], 500);
        }
    }

    public function saveDishComment(Request $request)
    {
        $request->validate([
            'idPost' => 'required',
            'theText' => 'required',
            'username' => 'required',
        ]);

        $newDishComment = $request->only(['id', 'idPost', 'theText', 'username', 'dateComment', 'likes']);

        try {
            $data = File::exists($this->dishCommentsFilePath) ? File::get($this->dishCommentsFilePath) : '[]';
            $dishComments = json_decode($data, true);
            $dishComments[] = $newDishComment;

            File::put($this->dishCommentsFilePath, json_encode($dishComments, JSON_PRETTY_PRINT));

            return response()->json(['message' => 'DishComment saved successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error saving data'], 500);
        }
    }

    public function updateDishcussing(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'likes' => 'nullable',
            'comments' => 'nullable',
        ]);

        try {
            $data = File::get($this->dishcussingFilePath);
            $dishcussings = json_decode($data, true);
            $index = array_search($request->id, array_column($dishcussings, 'id'));

            if ($index === false) {
                return response()->json(['message' => 'Dishcussing not found'], 404);
            }

            if ($request->has('likes')) {
                $dishcussings[$index]['likes'] = $request->likes;
            }
            if ($request->has('comments')) {
                $dishcussings[$index]['comments'] = $request->comments;
            }

            File::put($this->dishcussingFilePath, json_encode($dishcussings, JSON_PRETTY_PRINT));

            return response()->json(['message' => 'Dishcussing updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating data'], 500);
        }
    }

    public function updateDishComment(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'likes' => 'nullable',
        ]);

        try {
            $data = File::get($this->dishCommentsFilePath);
            $dishComments = json_decode($data, true);
            $index = array_search($request->id, array_column($dishComments, 'id'));

            if ($index === false) {
                return response()->json(['message' => 'Dishcomment not found'], 404);
            }

            if ($request->has('likes')) {
                $dishComments[$index]['likes'] = $request->likes;
            }

            File::put($this->dishCommentsFilePath, json_encode($dishComments, JSON_PRETTY_PRINT));

            return response()->json(['message' => 'Dishcomment updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating data'], 500);
        }
    }
}
