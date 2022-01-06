import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/LocalStorage.service';
import { Location } from '@angular/common'
import { Song } from 'src/app/interfaces/song.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { InvokeMode } from 'src/app/enums/invoke-mode.enum';
import Utils from 'src/app/utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  @ViewChild('AddSongForm') addSongForm: NgForm | undefined;
  form: FormGroup | undefined;
  imgUrl: string = '/assets/music.png'
  invokeMode: number = InvokeMode.ADD
  songId: number = 0;
  title: string = "Add New Song"

  readonly InvokeModeAdd = InvokeMode.ADD;
  readonly InvokeModeEdit = InvokeMode.EDIT;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    if (this.activatedRoute.snapshot.params['id']) {
      this.title = "Edit Song"
      this.songId = +this.activatedRoute.snapshot.params['id']
      this.invokeMode = InvokeMode.EDIT
      this.setSongDetailsToForm()
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      artist: [null, [Validators.required]],
      year: [null, [Validators.maxLength(4), Validators.pattern("[0-9]+")]],
      genre: [null],
      albumArt: [this.imgUrl],
      // email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
  }

  setSongDetailsToForm(): void {
    const existingSongs: Song[] = this.localStorageService.get('song-list')
    if (existingSongs) {
      const song = existingSongs.find(song => song.id === this.songId)
      this.form?.get('name')?.setValue(song?.name);
      this.form?.get('artist')?.setValue(song?.artist);
      this.form?.get('year')?.setValue(song?.year);
      this.form?.get('genre')?.setValue(song?.genre);
      this.form?.get('albumArt')?.setValue(song?.albumArt);
      this.imgUrl = song?.albumArt ? song?.albumArt : '/assets/music.png'
    } else {
    }
  }

  submitForm(form: FormGroup) {
    const song: Song = {
      id: Date.now(),
      name: form.value.name,
      artist: form.value.artist,
      genre: form.value.genre,
      year: form.value.year,
      albumArt: form.value.albumArt,
    }
    if (this.invokeMode === InvokeMode.ADD)
      this.saveSong(song)
    if (this.invokeMode === InvokeMode.EDIT)
      this.editSong(song, this.songId)
  }

  saveSong(song: Song): void {
    const existingSongs = this.localStorageService.get('song-list')
    if (existingSongs) {
      const newSongList = [...existingSongs, song]
      this.localStorageService.set('song-list', newSongList)
    } else {
      this.localStorageService.set('song-list', [song])
    }
    this.snackBar.open('Song Added Successfully', 'Close', { panelClass: 'success-snack' });
    this.resetForm()
    this.resetAlbumArt()
  }

  editSong(song: Song, id: number): void {
    const songsFromStorage: Song[] = this.localStorageService.get('song-list')
    const songIndex = songsFromStorage.findIndex(song => song.id === id)
    if (songIndex !== -1) {
      songsFromStorage.splice(songIndex, 1, song)
      this.localStorageService.set('song-list', songsFromStorage)
      this.snackBar.open('Song Updated Successfully', 'Close', { panelClass: 'success-snack' });
      this.resetForm()
      this.resetAlbumArt()
    }
  }

  onChangeAlbumArtClick(AlbumArtFileInput: HTMLInputElement) {
    AlbumArtFileInput.click()
  }

  onAlbumArtChange(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      if (Utils.validateFileSize(files[0])) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          if (reader.result) {
            this.imgUrl = reader.result?.toString()
            this.form?.get('albumArt')?.setValue(this.imgUrl);
          }
        };
      } else {
        this.snackBar.open('File size should be less that 5mb', 'Close', {
          panelClass: 'error-snack'
        });
      }
    }
  }

  onSaveClick(e: Event) {
    if (this.addSongForm && this.form?.valid)
      this.addSongForm.onSubmit(e);
  }

  onBackClick() {
    this.router.navigate(['/list-song'])
  }

  resetForm(): void {
    this.form?.reset()
    this.form?.get('name')?.setErrors(null)
    this.form?.get('artist')?.setErrors(null)
  }

  resetAlbumArt(): void {
    this.imgUrl = '/assets/music.png'
  }
}
