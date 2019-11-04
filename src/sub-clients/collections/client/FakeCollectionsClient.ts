import { CollectionFactory } from '../../../test-support';
import { SubjectFactory } from '../../../test-support/SubjectsFactory';
import { VideoFactory } from '../../../test-support/VideosFactory';
import Pageable from '../../common/model/Pageable';
import { Collection, getAttachmentType } from '../model/Collection';
import CollectionFilter from '../model/CollectionFilter';
import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from '../model/CollectionRequest';
import { CollectionsClient } from './CollectionsClient';

export class FakeCollectionsClient implements CollectionsClient {
  private collections: Collection[] = [];
  private nextId: string = '123';

  // todo: group these fake-related methods in some way
  public addToFake(collection: Collection) {
    this.collections.push(collection);
  }

  public setNextIdForFake(id: string) {
    this.nextId = id;
  }

  public get(id: string): Promise<Collection> {
    return Promise.resolve(this.collections.find(c => c.id === id));
  }

  public getAllFiltered(
    filter: CollectionFilter,
  ): Promise<Pageable<Collection>> {
    const fromIndex = filter.page * filter.size;
    const untilIndex = (filter.page + 1) * filter.size;
    return Promise.resolve({
      pageSpec: {
        number: filter.page,
        size: filter.size,
        totalElements: this.collections.length,
        totalPages: Math.floor(this.collections.length / filter.size),
      },
      page: this.collections.slice(fromIndex, untilIndex),
    });
  }

  public create(request: CreateCollectionRequest): Promise<string> {
    const { title, description, public: isPublic, videos } = request;
    const collection = CollectionFactory.sample({
      id: this.nextId,
      title,
      description,
      videos: videos.map(id => VideoFactory.sample({ id })),
      public: isPublic,
    });
    this.addToFake(collection);

    return Promise.resolve(collection.id);
  }

  public update(id: string, request: UpdateCollectionRequest): Promise<{}> {
    this.collections = this.collections.map(it =>
      it.id === id
        ? {
            ...it,
            ...FakeCollectionsClient.mapUpdateRequestToFields(request),
          }
        : it,
    );
    return Promise.resolve({});
  }

  private static mapUpdateRequestToFields(
    request: UpdateCollectionRequest,
  ): Partial<Collection> {
    const partialCollection: Partial<Collection> = {};

    if (request.hasOwnProperty('title')) {
      partialCollection.title = request.title;
    }

    if (request.hasOwnProperty('public')) {
      partialCollection.public = request.public;
    }

    if (request.hasOwnProperty('subjects')) {
      partialCollection.subjects = request.subjects.map(id =>
        SubjectFactory.sample({ id }),
      );
    }

    if (request.hasOwnProperty('description')) {
      partialCollection.description = request.description;
    }

    if (request.hasOwnProperty('videos')) {
      partialCollection.videos = request.videos.map(id =>
        VideoFactory.sample({ id }),
      );
    }

    if (request.hasOwnProperty('attachment')) {
      const attachmentType = getAttachmentType(request.attachment.type);
      if (attachmentType === undefined) {
        throw new Error(
          `${request.attachment.type} is not a valid attachment type`,
        );
      }

      partialCollection.attachments = [
        {
          type: attachmentType,
          description: request.attachment.description,
          linkToResource: request.attachment.linkToResource,
        },
      ];
    }

    if (request.hasOwnProperty('ageRange')) {
      const { min, max } = request.ageRange;
      partialCollection.ageRange = {
        ...request.ageRange,
        label: min ? (max ? `${min}-${max}` : `${min}+`) : '',
      };
    }

    return partialCollection;
  }
}
