<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class RevokeAllTokens extends Command
{
    protected $signature = 'tokens:revoke-all';
    protected $description = 'Revoke all active personal access tokens';

    public function handle()
    {
        // Delete all tokens
        DB::table('personal_access_tokens')->truncate();

        // Set a global invalidation flag (e.g., in cache)
        Cache::put('invalidate_tokens', true);

        $this->info('All active tokens have been revoked.');
    }
}
