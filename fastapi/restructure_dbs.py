import os
import shutil
import sqlite3

def setup_directories():
    categories = ['Retail', 'Culinary', 'Healthcare', 'Hospitality', 'Education', 'Corporate']
    for cat in categories:
        os.makedirs(f"db/{cat}", exist_ok=True)

def move_and_rename():
    moves = {
        'Indonesia.Batam.Kuliner.202406162232.db': 'Culinary/Culinary.db',
        'Indonesia.Batam.Kesehatan.202408050759.db': 'Healthcare/Healthcare.db',
        'Indonesia.Batam.Hotel.202408042041.db': 'Hospitality/Hospitality.db',
        'Indonesia.Batam.School.202408060757.db': 'Education/Education.db',
        'Indonesia.Batam.PT.202408042212.db': 'Corporate/Corporate.db',
    }
    
    for old, new_path in moves.items():
        old_path = os.path.join('db', old)
        new_full_path = os.path.join('db', new_path)
        if os.path.exists(old_path):
            shutil.move(old_path, new_full_path)
            print(f"Moved {old} -> {new_path}")

def merge_retail():
    retail_dbs = [
        'Indonesia.Batam.Cosmetics.202410290644.db',
        'Indonesia.Batam.Toko Bangunan.202408021219.db',
        'Indonesia.Batam.Toko Komputer.202410170720.db'
    ]
    
    main_retail_db = 'db/Retail/Retail.db'
    
    # 1. Rename Cosmetics to Retail.db
    first_db = os.path.join('db', retail_dbs[0])
    if os.path.exists(first_db):
        shutil.move(first_db, main_retail_db)
        print(f"Moved {retail_dbs[0]} -> Retail/Retail.db")
    
    if not os.path.exists(main_retail_db):
        print("Retail base DB not found.")
        return
        
    conn_main = sqlite3.connect(main_retail_db)
    cursor_main = conn_main.cursor()
    cursor_main.execute("PRAGMA table_info(places)")
    main_cols = {col[1] for col in cursor_main.fetchall()}
    
    for other in retail_dbs[1:]:
        other_path = os.path.join('db', other)
        if not os.path.exists(other_path):
            continue
            
        print(f"Merging {other} into Retail.db...")
        conn_other = sqlite3.connect(other_path)
        cursor_other = conn_other.cursor()
        
        cursor_other.execute("PRAGMA table_info(places)")
        other_cols = [col[1] for col in cursor_other.fetchall()]
        shared_cols = [c for c in other_cols if c in main_cols and c != 'id']
        
        col_select_str = ", ".join(shared_cols)
        col_insert_str = ", ".join(shared_cols)
        placeholders = ", ".join(["?" for _ in shared_cols])
        
        insert_query = f"INSERT OR IGNORE INTO places ({col_insert_str}) VALUES ({placeholders})"
        
        cursor_other.execute(f"SELECT {col_select_str} FROM places")
        rows = cursor_other.fetchall()
        
        cursor_main.executemany(insert_query, rows)
        conn_main.commit()
        conn_other.close()
        
        # Delete the merged file
        os.remove(other_path)
        print(f"  Merged {len(rows)} rows and deleted {other}")
        
    conn_main.close()

if __name__ == "__main__":
    setup_directories()
    move_and_rename()
    merge_retail()
    print("Database restructuring complete.")
