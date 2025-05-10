package database

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func GetDatabase() (*sqlx.DB, error) {
	saveDir := filepath.Join(common.GetPrivateDirectory(), "db")
	dbPath := filepath.Join(saveDir, "db.sql")

	err := os.MkdirAll(saveDir, 0755)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to create database save dir")
	}

	db, err := sqlx.Open("sqlite3", fmt.Sprintf("file:%s?cache=shared&_busy_timeout=5000&_journal=WAL&_synchronous=NORMAL&_txlock=immediate", dbPath))
	if err != nil {
		return nil, errutil.Wrap(err, "failed to open sqlite db")
	}

	db.SetMaxOpenConns(1) // avoid concurrency issues for sqlite

	return db, nil
}
