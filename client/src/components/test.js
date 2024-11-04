import React from "react";

export default function test() {
    return (
        <section data-require="player/controls,player/status,player/tracking" data-player-status-ad-playing="Ad playing" data-player-status-inactive="&nbsp;" data-player-status-loading-spotify="Connecting Spotify…" data-player-status-spotify-auth-error="Could not authenticate with Spotify." data-player-error-cannot-play-item="Cannot play that item." data-player-error-track-unavailable="Track unavailable." data-player-modal-title="Play video" class="
            player-bar
            inactive
        " aria-label="audio player" aria-disabled="true">
        <div class="player-bar-inner-wrap">
            <a class="player-bar-artwork js-artwork">
                <img class="" src="/static/images/defaults/player_default_album.430223706b14.png" alt="" loading="lazy">
            </a>

            <span class="
                player-bar-source
                player-bar-source--spotify
            ">Playing via Spotify</span>

            <span class="
                player-bar-source
                player-bar-source--youtube
            ">Playing via YouTube</span>

            <div class="source-info">
                <button class="player-bar-playback-options-button" data-disclose-hover="" aria-controls="player-bar-playback-options">
                    Playback options
                </button>
                <div id="player-bar-playback-options" class="
                        player-bar-playback-options-wrap
                        disclose-hide
                    ">
                    <ul class="
                        dropdown-menu-dark
                        player-bar-playback-options-spotify
                    ">
                        <li class="dropdown-menu-non-interactive-item-dark">
                            <span class="player-bar-listening-on-heading">Listening on…</span>
                            <span class="
                                player-bar-listening-on
                                js-player-bar-listening-on
                            "></span>
                        </li>
                        <li><button class="
                            dropdown-menu-item-dark
                            js-switch-device
                            player-bar-playback-options-switch-device
                        ">Switch Spotify device</button></li>
                        <li><a class="
                                js-source
                                dropdown-menu-item-dark
                                player-bar-playback-options-external-link
                            " target="_blank">Open in Spotify Web Player</a></li>
                        
    <li class="menu-separator--dark">
        <a href="/login?next=/settings/website" class="
                dropdown-menu-item-dark
                player-bar-playback-options-settings
            ">
            Change playback source
        </a>
    </li>

                    </ul>
                    <ul class="
                        dropdown-menu-dark
                        player-bar-playback-options-youtube
                    ">
                        <li><a class="
                                dropdown-menu-item-dark
                                js-source
                                player-bar-playback-options-external-link
                            " target="_blank">Open on YouTube website</a></li>
                        
    <li class="menu-separator--dark">
        <a href="/login?next=/settings/website" class="
                dropdown-menu-item-dark
                player-bar-playback-options-settings
            ">
            Change playback source
        </a>
    </li>

                    </ul>
                </div>
            </div>

            

            <div class="player-bar-controls">

                <ul aria-label="controls" class="media-controls">
                    <li>
                        <button disabled="" class="
                                js-previous
                                player-bar-btn
                                player-bar-btn--previous
                            " data-analytics-action="PlaybarBackTrack">
                            Previous
                        </button>
                    </li>
                    <li>
                        <button disabled="" class="
                                js-play-pause
                                player-bar-btn
                                player-bar-btn--play
                            " data-string-pause="Pause" data-analytics-action="PlaybarResumeTrack" data-analytics-action-pause="PlaybarPauseTrack">
                            Play
                        </button>
                    </li>
                    <li>
                        <button disabled="" class="
                                js-next
                                player-bar-btn
                                player-bar-btn--next
                            " data-analytics-action="PlaybarSkipTrack">
                            Next
                        </button>
                    </li>
                    
                </ul>

                <a class="
                        player-bar-skiplink
                        player-bar-skiplink--youtube
                    " href="#youtube-video">Skip to YouTube video</a>

            </div>

            <div class="player-bar-now-playing">
                <div class="player-bar-now-playing-inner-wrap">
                    <p class="player-bar-track js-player-status" aria-label="now playing" aria-live="polite" aria-atomic="true" title="&nbsp;">&nbsp;</p>

                    <p class="player-bar-error js-player-error player-bar-status--hide">
                        <span class="player-bar-error-message js-player-error-message"></span>
                    </p>
                </div>
            </div>
        </div>

        
        <div class="player-bar-progress-wrap">
            <div class="player-bar-progress" aria-label="progress" role="timer">
                <div class="
                        js-progress-slug
                        player-bar-progress-slug
                    ">
                    <span class="
                            js-progress-remaining
                            player-bar-progress-remaining
                        " aria-label="remaining"></span>
                </div>
            </div>
        </div>

        <div data-require="player/scrobble-client"></div>
    </section>
    )
}