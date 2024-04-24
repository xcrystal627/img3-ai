import { db } from '@/libs/firebase/firebase'
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp, collection, doc, serverTimestamp } from 'firebase/firestore'
import dayjs from 'dayjs'
import { Company } from '@/features/company/models/company.model'

export class AppFirestoreModel {
  get toJson() {
    return {
      ...this,
    }
  }
}

export const converter = {
  toFirestore: <T extends AppFirestoreModel>(data: T) => (data instanceof AppFirestoreModel ? data.toJson : data),
  fromFirestore: <T>(snapshot: QueryDocumentSnapshot) => snapshot.data() as T,
}

export class ColName {
  // example
  // static readonly members = 'members';
  static readonly companies = 'companies'
}

export class ColRef {
  // example
  // static members = collection(db, ColName.members).withConverter<Member>(converter);
  static companies = collection(db, ColName.companies).withConverter<Company, Company>(converter)
}

export class SubColName {
  // example
  // static readonly memberReports = 'memberReports';
  static readonly companyEstimates = 'companyEstimates'
  static readonly companyProjects = 'companyProjects'
}

export class SubColRef {
  // example
  // static memberReports = (id: string) => collection(DocRef.member(id), SubColName.memberReports).withConverter<MemberReport>(converter);
  static readonly companyEstimates = (companyId: string) => collection(DocRef.company(companyId), SubColName.companyEstimates).withConverter<Company, Company>(converter)
  static readonly companyProjects = (companyId: string) => collection(DocRef.company(companyId), SubColName.companyProjects).withConverter<Company, Company>(converter)
}

export class ColGroupRef {
  // example
  // static memberReports = collectionGroup(db, SubColName.memberReports).withConverter<MemberReport>(converter);
}

export class DocRef {
  // example
  // static member = (id: string) => doc(db, ColName.members, id).withConverter<Member>(converter);
  static company = (id: string) => doc(db, ColName.companies, id).withConverter<Company, Company>(converter)
  static companyEstimate = (companyId: string, estimateId: string) => doc(db, ColName.companies, companyId, SubColName.companyEstimates, estimateId).withConverter<Company, Company>(converter)
  static companyProject = (companyId: string, projectId: string) => doc(db, ColName.companies, companyId, SubColName.companyProjects, projectId).withConverter<Company, Company>(converter)
}

export const generateDocId = () => {
  return doc(collection(db, 'authId')).id
}

export const getDocIdWithData = <T>(doc: DocumentSnapshot<T>) => {
  if (!doc.exists()) {
    throw new Error('Document does not exist')
  }

  return {
    id: doc.id,
    ...doc.data(),
  }
}

export const getDocData = <T>(doc: DocumentSnapshot<T>) => {
  if (!doc.exists()) {
    throw new Error('Document does not exist')
  }

  return doc.data()
}

export const appServerTimestamp = () => {
  return serverTimestamp()
}

export const toTimestamp = (date: Date) => {
  return Timestamp.fromDate(date)
}

export const toDateStr = (timestamp: Timestamp, format?: string) => {
  return dayjs(timestamp.toDate()).format(format ?? 'YYYY/MM/DD HH:mm')
}
