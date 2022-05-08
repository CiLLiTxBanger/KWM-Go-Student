<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'subject', 'description'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function timeslots(): HasMany {
        return $this->hasMany(Timeslot::class);
    }

    public function usercomments(): HasMany {
        return $this->hasMany(Usercomment::class);
    }

}
