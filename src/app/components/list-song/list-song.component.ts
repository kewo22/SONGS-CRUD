import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Song } from 'src/app/interfaces/song.interface';
import { LocalStorageService } from 'src/app/services/LocalStorage.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {

  displayedColumns: string[] = ['name', 'artist', 'genre', 'year', 'action'];
  dataSource: Song[] = [];
  clickedRows = new Set<Song>();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getSongs()
  }

  getSongs(): void {
    const songs: Song[] = this.localStorageService.get('song-list')
    this.dataSource = [...songs]
  }

  onEditClick(row: Song): void {
    console.log(row)
    this.router.navigate(['/edit-song', row.id])
  }

  onDeleteClick(row: Song): void {
    const songs: Song[] = this.localStorageService.get('song-list')
    const songIndex = songs.findIndex(song => song.id === row.id)
    let updatedSongs: Song[] = []
    if (songIndex !== -1) {
      songs.splice(songIndex, 1)
      updatedSongs = [...songs]
      this.localStorageService.set('song-list', updatedSongs)
      this.snackBar.open('Song Deleted Successfully', 'Close', { panelClass: 'success-snack' });
      this.getSongs()
    }
  }

}
