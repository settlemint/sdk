#!/bin/bash
set -eo pipefail

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to apply migrations
apply_migrations() {
    log "Applying Hasura migrations..."
    if hasura migrate apply --all-databases; then
        log "Migrations applied successfully."
    else
        log "Error applying migrations. Exiting."
        exit 1
    fi
}

# Function to apply metadata
apply_metadata() {
    log "Applying Hasura metadata..."
    if hasura metadata apply; then
        log "Metadata applied successfully."
    else
        log "Error applying metadata. Exiting."
        exit 1
    fi
}

# Main execution
if [ -d "./database" ]; then
    cd ./database || { log "Failed to change to database directory. Exiting."; exit 1; }

    MIGRATIONS_DIR="./migrations"
    METADATA_DIR="./metadata"

    # Check and apply migrations
    if [ -d "$MIGRATIONS_DIR" ]; then
        apply_migrations
    else
        log "Migrations directory not found. Skipping migration step."
    fi

    # Check and apply metadata
    if [ -d "$METADATA_DIR" ]; then
        apply_metadata
    else
        log "Metadata directory not found. Skipping metadata step."
    fi

    cd - > /dev/null || { log "Failed to return to original directory. Exiting."; exit 1; }
else
    log "Database directory not found. Skipping Hasura operations."
fi

# Execute the main container command
log "Starting main application..."
exec bun run "$@"
