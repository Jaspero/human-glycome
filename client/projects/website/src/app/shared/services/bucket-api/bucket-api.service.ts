import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BucketApiFile} from '../../interfaces/bucket-api/bucket-api-file.interface';

@Injectable({
  providedIn: 'root'
})
export class BucketApiService {
  constructor(private _http: HttpClient) {}

  insertMany(collection: string, files: File[]) {
    const formData = new FormData();

    for (const d of files) {
      formData.append('files', d, d.name);
    }

    return this._http.post<{success: boolean; data: BucketApiFile[]}>(
      `${environment.bucketApiUrl}bucket/${collection}`,
      formData
    );
  }

  remove(collection: string, fileName: string) {
    return this._http.delete<{success: boolean}>(
      `${environment.bucketApiUrl}bucket/${collection}/${fileName}`
    );
  }
}
