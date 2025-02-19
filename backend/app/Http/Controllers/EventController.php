<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        return response()->json(Event::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'event_date' => 'required|date',
            'phone' => 'required|string|max:15',
            'location' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'number' => 'required|string|max:10',
            'complement' => 'nullable|string|max:255',
        ]);

        $event = Event::create([
            'name' => $validated['name'],
            'event_date' => $validated['event_date'],
            'phone' => $validated['phone'],
            'location' => $validated['location'],
            'state' => $validated['state'],
            'address' => $validated['address'],
            'number' => $validated['number'],
            'complement' => $validated['complement'] ?? null,
            'organizer' => Auth::user()->name,
        ]);
        return response()->json($event, 201);
    }

    public function show($id)
    {
        return response()->json(Event::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'event_date' => 'sometimes|required|date',
            'phone' => 'sometimes|required|string|max:15',
            'location' => 'sometimes|required|string|max:255',
            'state' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:255',
            'number' => 'sometimes|required|string|max:10',
            'complement' => 'nullable|string|max:255',
        ]);

        $event = Event::findOrFail($id);
        
        $event->update($validated);

        return response()->json($event);
    }


    public function destroy($id)
    {
        Event::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Event deleted successfuly!'], 200);
    }
}
