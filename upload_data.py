from pinecone import Pinecone
import numpy as np

# Initialize Pinecone client
PINECONE_API_KEY = ''
PINECONE_ENVIRONMENT = '' # e.g., 'us-west1-gcp'
PINECONE_INDEX = ''  # Your index name


pc = Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_ENVIRONMENT)
index = pc.Index(PINECONE_INDEX)

# Correct dimension for your index
VECTOR_DIMENSION = 768

# Data to upload (use dummy data with correct dimension)
data = [
    {"id": "vec1", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. Alice Smith", "review": "Prof. Smith is incredibly knowledgeable and makes complex topics very accessible. Her passion for teaching is evident in every lecture."}},
    {"id": "vec2", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. Bob Johnson", "review": "Prof. Johnson brings a wealth of experience to the classroom. His practical examples and engaging teaching style make learning enjoyable."}},
    {"id": "vec3", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. Carol White", "review": "Prof. White is an excellent educator with a knack for explaining difficult concepts clearly. Her classes are always well-organized and insightful."}},
    {"id": "vec4", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. David Brown", "review": "Prof. Brown's lectures are interactive and thought-provoking. He encourages critical thinking and provides valuable feedback on assignments."}},
    {"id": "vec5", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. Emily Davis", "review": "Prof. Davis is enthusiastic and approachable. Her ability to relate theoretical concepts to real-world applications enhances the learning experience."}},
    {"id": "vec6", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. Frank Wilson", "review": "Prof. Wilson's deep understanding of the subject matter and engaging teaching methods make his classes highly effective and enjoyable."}},
    {"id": "vec7", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. Grace Lee", "review": "Prof. Lee is an outstanding professor with a clear and structured approach to teaching. Her feedback is always constructive and helpful."}},
    {"id": "vec8", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. Henry Martinez", "review": "Prof. Martinez is passionate about the subject and creates a dynamic learning environment. His classes are both informative and inspiring."}},
    {"id": "vec9", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. Irene Taylor", "review": "Prof. Taylor’s lectures are well-organized and easy to follow. She is always available for extra help and provides valuable insights into the subject matter."}},
    {"id": "vec10", "values": np.random.rand(VECTOR_DIMENSION).tolist(), "metadata": {"professor": "Prof. John Anderson", "review": "Prof. Anderson has a unique teaching style that keeps students engaged. His enthusiasm for the subject is contagious, and his feedback is very constructive."}},
]

# Upsert data
index.upsert(vectors=data, namespace="professors")

print("Data uploaded successfully.")
