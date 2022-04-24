<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'subject', 'description', 'timeslots'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function timeslot() {

    }
}
