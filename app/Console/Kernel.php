<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('app:send-capsule-reveal-emails')
             ->everyFiveMinutes()
             ->timezone('Asia/Beirut');

        // log every minute to test scheduler
        $schedule->call(function () {
            Log::info('Scheduler is running at ' . now());
        })->everyMinute();
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
