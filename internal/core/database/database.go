package database

import (
	"os"
	"path"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func GetDatabase() (*sqlx.DB, error) {
	saveDir := path.Join(common.GetPrivateDirectory(), "db")
	dbPath := path.Join(saveDir, "db.sql")

	err := os.MkdirAll(saveDir, 0755)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to create database save dir")
	}

	db, err := sqlx.Open("sqlite3", dbPath)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to open sqlite db")
	}

	return db, nil
}
